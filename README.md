<h1 align="center">Module Chat Frontend</h1>
<p align="center">
  A React-based frontend for real-time group chats using SignalR, designed for educational modules like <strong>ppa015D</strong>.
</p>

<hr />

<h2>🚀 Features</h2>
<ul>
  <li>Real-time messaging within a specific module group.</li>
  <li>File sharing within the group (supports images, documents, etc.).</li>
  <li>Role-based participation (Mentors and Mentees).</li>
  <li>Dynamic message handling and display.</li>
</ul>

<h2>📁 Project Structure</h2>
<pre>
├── src
│   ├── components
│   │   └── ModuleChatComponent.jsx
│   ├── styles
│   │   └── ChatStyles.css
│   └── App.jsx
├── public
│   └── index.html
├── package.json
</pre>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Frontend Framework:</strong> React.js</li>
  <li><strong>Real-Time Communication:</strong> SignalR</li>
  <li><strong>Languages:</strong> JavaScript, CSS</li>
  <li><strong>Build Tool:</strong> Vite or Create React App</li>
</ul>

<h2>⚙️ Installation</h2>
<ol>

  <li>Navigate to the project directory:
    <pre><code>cd ModuleChatFrontend</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Run the application:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h2>📄 How It Works</h2>
<ul>
  <li>The app connects to a SignalR hub at <code>https://localhost:7215/communicationHub</code>.</li>
  <li>Users (Mentors or Mentees) join the group associated with the module code (e.g., <strong>ppa015D</strong>).</li>
  <li>Messages and files are shared within the group in real time.</li>
</ul>

<h2>🔑 API Endpoints</h2>
<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/communicationHub</td>
      <td>WebSocket</td>
      <td>SignalR hub for real-time communication.</td>
    </tr>
  </tbody>
</table>

<h2>👨‍💻 Contributors</h2>
<ul>
  <li><strong>Your Name:</strong> Frontend Development</li>
</ul>

<h2>📄 License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>


