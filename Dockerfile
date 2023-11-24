FROM tomcat:9.0

ENV brainySecret=<Your Secret Key>
ENV domain=localhost:8080
#ENV domain=<Your Domain without http:// or https:// such as wayos.yiem.ai>

ENV facebook_apiVersion=<Your Facebook App API Version>
ENV facebook_appId=<Your Facebook App Id>
ENV facebook_appSecret=<Your Facebook App Secret>

ENV showcaseAccountId=<Your Username>
ENV showcaseBotId=<Your Chatbot Name>

# For ROOT.war

ENV storagePath=/usr/local/wayOS

COPY wayOS ${storagePath}

COPY ROOT.war /usr/local/tomcat/webapps/

CMD ["catalina.sh", "run"]