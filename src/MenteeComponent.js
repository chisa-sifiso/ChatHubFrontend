import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import './ChatStyles.css';

const ModuleChatComponent = ({ userRole, userId, moduleCode = "ppa015D" }) => {
  const [connection, setConnection] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7215/communicationHub?userId=${userId}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.start()
      .then(async () => {
        console.log(`Connected to SignalR hub as ${userRole}`);

        // Join the group using the module code
        await newConnection.invoke("JoinModuleGroup", moduleCode);
        console.log(`Joined group: ${moduleCode}`);

        // Listen for group messages
        newConnection.on("ReceiveGroupMessage", (senderName, message, timestamp) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: senderName, message, timestamp }
          ]);
        });

        // Listen for file messages in the group
        newConnection.on("ReceiveFileMessage", (senderName, base64File, fileType, timestamp) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: senderName, message: "[File Received]", timestamp, isFile: true, fileType, fileData: base64File }
          ]);
        });
      })
      .catch(err => console.error("Connection failed: ", err));

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [userId, moduleCode, userRole]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && connection && connection.state === signalR.HubConnectionState.Connected) {
      const timestamp = new Date().toLocaleTimeString();
      const senderName = userRole;

      setMessages(prevMessages => [
        ...prevMessages,
        { sender: senderName, message: newMessage, timestamp }
      ]);

      try {
        await connection.invoke("SendMessageToModuleGroup", moduleCode, senderName, newMessage, timestamp);
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];
      const timestamp = new Date().toLocaleTimeString();
      const senderName = userRole;

      try {
        await connection.invoke("SendFileMessage", moduleCode, senderName, base64String, uploadedFile.type, timestamp);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: senderName, message: "[File Uploaded]", timestamp, isFile: true, fileType: uploadedFile.type, fileData: base64String }
        ]);
      } catch (error) {
        console.error("Error sending file:", error);
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  return (
    <div className="chat-container">
      <h3 className="chat-header">Module Chat ({moduleCode}) - {userRole}</h3>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userRole ? "self" : "other"}`}>
            <strong>{msg.sender}:</strong>
            {msg.isFile ? (
              msg.fileType.startsWith("image") ? (
                <img src={`data:${msg.fileType};base64,${msg.fileData}`} alt="Uploaded" />
              ) : (
                <a href={`data:${msg.fileType};base64,${msg.fileData}`} download>Download File</a>
              )
            ) : (
              <span>{msg.message}</span>
            )}
            <em>{msg.timestamp}</em>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <label htmlFor="file-upload" className="file-label">Choose File</label>
        <input id="file-upload" type="file" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default ModuleChatComponent;
