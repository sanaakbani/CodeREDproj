import smtplib
from email.message import EmailMessage

print("hi")

message = EmailMessage()
message['Subject'] = "ConocoSafe "
message.set_content("Assistance is needed!")

username = "conocosafe101@gmail.com"
password = conocosafe101

message['From'] = username
message['To'] = "8327637111@tmomail.net"

server = smtplib.SMTP("smtp@gmail.com", 587)
server.starttls()
server.login(username, password)

server.send_message(message)
server.quit()