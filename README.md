# WhatsApp About Automation

This is a simple NodeJS script which uses the [whatsapp-web-js](https://github.com/pedroslopez/whatsapp-web.js) library to automatically update your WhatsApp about every day at midnight. Currently, it updates your about to the number of days you've lived, but you could set it to anything you like!

## Usage

Run this command to start the script:

```
node whatsapp.js
```

Once the program is up, you will be prompted with a QR code. Scan this QR code in WhatsApp using the 'Linked Devices' option under the three dots menu. If you see `authenticated undefined` in the terminal, your program is up and running.

You can automate starting the script on boot using systemd if your Linux distro uses it. Here's an example file:
`whatsappAbout.service`

```
[Unit]
Description=WhatsApp About Service
After=network.target

[Service]
Type=simple
ExecStart=/home/john/.nvm/versions/node/v18.20.3/bin/node whatsapp.js
WorkingDirectory=/home/john/Scripts/whatsapp/
User=john

[Install]
WantedBy=multi-user.target
```

Now run:

```
systemctl daemon-reload
systemctl start whatsappAbout.service
systemctl enable whatsappAbout.service
```

The program will now automatically start running in the background when your system boots. You can see any logs that it outputs by running:

```
journalctl -u whatsappAbout.service
```

## Why?

Why not? Seriously though, I love using technology to automate stuff even if they provide no productive use.
