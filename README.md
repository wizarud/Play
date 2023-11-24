## Play
Playable Chatbot on Web by [wayOS](https://github.com/Wizarud/wayOS).

## Motivation
Chatbot Development tool on web, Create once run anywhere.

![Logic Designer](https://cdn.gotoknow.org/assets/media/files/001/484/349/large_1689579716.png)

![Play on LINE](https://cdn.gotoknow.org/assets/media/files/001/484/348/large_1689579696.jpg)

## Build status
Ready for customization.

## Technology Stack
- Tomcat 9.0
- [wayOS](https://github.com/Wizarud/wayOS)
- Java 1.8

## Features

#### Programmable Chatbot by Logic Designer
![Logic Designer](https://cdn.gotoknow.org/assets/media/files/001/484/346/large_1689579641.png)

Logic designer helps chatbot programmable. You can drag & drop to create the entity which can contains key-response pair that will active if its keyword matches the user's message.

#### Edit Chatbot by CHAI (Common Hyper Active Instruction) Script
![CHAI Script](https://cdn.gotoknow.org/assets/media/files/001/484/345/large_1689579616.png)

You can also use spreadsheet in TSV format to create your chatbot. This tool is suit for simple business case such as FAQ.

#### Play!
![Play on Web](https://cdn.gotoknow.org/assets/media/files/001/484/347/large_1689579677.png)

Play your chatbot on web.

## Installation

This is a web project so you have to build the [wayOS](https://github.com/Wizarud/wayOS) jar and copy to WEB-INF/lib, Pack as a WAR file and deploy it to Tomcat 9.0 (Java 1.8) and don't forget to config the following environment variables before start the server.

```
brainySecret=<Your Secret Key>
domain=<Your domain including port number such as wayos.yiem.ai or localhost:8080>
```

Mapping wayOS Storage to your local directory, This path will contains the context, resource, session variable, log, and credential configuration files.

```
storagePath=/usr/local/wayOS
```

Assign the chatbot that will show as welcome page

```
showcaseAccountId=<Play Account Id>
showcaseBotId=<Play Bot Id>
```

Incase of using Facebook for login, You have to create facebook app and add the following environment variables

```
facebook_apiVersion=<Your Facebook App API Version>
facebook_appId=<Your Facebook App Id>
facebook_appSecret=<Your Facebook App Secret>
```

## Tutorials

### Basic Tutorials

#### Hello World
![Hello World](https://wayos.yiem.ai/public/eoss-th/Flow-Hello-World.png)

### Sequence of Text and Image
![Flow](https://wayos.yiem.ai/public/eoss-th/Flow-Text-And-Image.png)

#### Keywords
![Keywords](https://wayos.yiem.ai/public/eoss-th/Flow-KeyWords.png)

#### Variable
![Variable](https://wayos.yiem.ai/public/eoss-th/Flow-Set-Read-Variable.png)

#### Math Operation
![Multiply](https://wayos.yiem.ai/public/eoss-th/Flow-Calculation-Multiply.png)

Multiply by using * operator

#### Parameter
![Parameter Forwarding](https://wayos.yiem.ai/public/eoss-th/Flow-Forwarding-Parameter.png)

#### Condition
![Condition](https://wayos.yiem.ai/public/eoss-th/Flow-Conditions.png)

#### Loop
![Loop](https://wayos.yiem.ai/public/eoss-th/Flow-Loop.png)

#### Random
![Random](https://wayos.yiem.ai/public/eoss-th/Flow-Random.png)

#### Menu
![Single Menu](https://wayos.yiem.ai/public/eoss-th/Flow-Single-Menu.png)

#### Slide Menus
![Slide Menus](https://wayos.yiem.ai/public/eoss-th/Flow-Slide-Menus.png)

Forwarding to multiple menus will generate the slide menus, To make the good user's experience, You should to use a single choice of menu item and the amount of menus should not more than 5.

### Advance Tutorials

#### Built-in Read Only Variables
To be updated later

#### REST API Calling
To be updated later

#### WebScrapping (JSOUP)
To be updated later

#### Action Variables
To be updated later

#### Custom Command
To be updated later

#### Custom Servlet
To be updated later

## How to use?
To be updated later

## Contributor

**Wisarut Srisawet**

## License
A free and open source project.
MIT © [wayOS](https://wayos.yiem.ai)