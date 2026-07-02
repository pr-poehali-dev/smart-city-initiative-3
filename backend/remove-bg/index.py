import json
import base64
import os
import urllib.request
import boto3
from rembg import remove
from PIL import Image
import io


def handler(event: dict, context) -> dict:
    """Удаляет фон с изображения по URL и сохраняет результат в S3."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    image_url = body.get('url')
    output_key = body.get('key', 'nobg/result.png')

    with urllib.request.urlopen(image_url) as resp:
        input_data = resp.read()

    output_data = remove(input_data)

    img = Image.open(io.BytesIO(output_data)).convert("RGBA")
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=output_key, Body=buf.read(), ContentType='image/png')

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{output_key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url}),
    }
