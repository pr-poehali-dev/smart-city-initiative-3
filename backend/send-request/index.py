import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку от клиента на почту ooo.ostov@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()
    product = body.get('product', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите имя и телефон'}, ensure_ascii=False)
        }

    smtp_user = 'ooo.ostov@mail.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {product or "светильник"}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    html = f"""
    <h2>Новая заявка с сайта Остов</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px">
      <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Имя / организация</td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
      <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Телефон</td><td style="padding:8px;border:1px solid #ddd">{phone}</td></tr>
      {'<tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Интересует</td><td style="padding:8px;border:1px solid #ddd">' + product + '</td></tr>' if product else ''}
      {'<tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Сообщение</td><td style="padding:8px;border:1px solid #ddd">' + message + '</td></tr>' if message else ''}
    </table>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }