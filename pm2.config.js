export default {
    apps: [{
        name: "whatsapp-sender",
        script: "dist/index.js",
        "time": true,
        "autorestart": true,
        "env": {
            "NODE_ENV": "production"
        }
    }]
}