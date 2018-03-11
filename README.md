# Dementia Calendar

Esta aplicación web está pensada para ayudar a personas con dificultades de memoria u otras capacidades de razonamiento, consiste en un panel donde se puede ver un reloj, la fecha actual y la parte del día en la que nos encontramos, además, cuenta con un apartado donde añadir notas que puedan ser de utilidad para la persona que lo consulte.

<p align="center">
    <img src="https://raw.githubusercontent.com/sergiovhe/dementia-calendar/master/img/sample.png" alt="Dementia Calendar" width="350">
</p>

## Mensajes 

Para añadir un mensaje la aplicación dispone de un API a través del cual se puede enviar información del usuario y el texto del mensaje que se desea mostrar:

```http
POST /api/v1/message
Content-Type: application/json

{
    "update_id": 0,
    "message": {
        "message_id": 1,
        "from": {
            "id": 0,
            "is_bot": false,
            "first_name": "user",
            "username": "user",
            "language_code": "en-US"
        },
        "chat": {
            "id": 0,
            "first_name": "user",
            "username": "user",
            "type": "private"
        },
        "date": 1520684894,
        "text": "Recuerda que a las 11:00 tienes cita con el médico"
    }
}

```

Para poder añadir mensajes facilmente se recomenda crear un bot de Telegram, para ello simplemente creamos un bot con BotFather y lo configuramos para que envie los mensajes a nuestra aplicación:

```shell
curl -F "url=https://dementia-calendar/api/v1/message"  https://api.telegram.org/bot<your_api_token>/setWebhook
```

Una vez configurado ya podemos iniciarlo y empezar a enviar mensajes

<p align="center">
    <br>
    <img src="https://raw.githubusercontent.com/sergiovhe/dementia-calendar/master/img/iphone-telegram.png" alt="Dementia Calendar (Telegram)" width="250">
</p>