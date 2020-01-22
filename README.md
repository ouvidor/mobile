# Ouvidor - Aplicação mobile
Repoistório da aplicação mobile do projeto Ouvidor.

# Setup inicial para o projeto funcionar

Certifique-se que existe um arquivo chamado local.properties na pasta /android.
Este arquivo deve estar apontando para a sua SDK.

Exemplo (Debian):
```
sdk.dir = /home/username/Android/Sdk
```

No Windows o caminho para a SDK pode ser um pouco diferente (É possível pegar o caminho pelo Android Studio, pesquise).

Certifique-se de ter rodado npm install.

Tendo feito estes dois passos, rode react-native run-android. O projeto irá compilar, e se tudo der certo,
você verá um erro de "No connected devices", caso não esteja com o emulador aberto/dispositivo conectado.

# Setup de react-native-maps e react-native-location

Para utilizarmos o react-native-location, é necessário adicionar 2 permissões no AndroidManifest.xml
Estas permissões são:

```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

Para utilizarmos o react-native-maps, precisamos adicionar o seguinte código, antes da tag </application>

```
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_AKI_KEY" />
```

Substitua YOUR_API_KEY com sua chave para utilizar o google-maps

# Rodando o app num dispositivo
Para utilizar o app num dispositivo, é preciso gerar um apk com os seguintes comandos (partindo da pasta /android):

DEBUG:
```
./gradlew assembleDebug
```
Release:
```
./gradlew assembleRelease
```

Para instalar apks release, é necessário assina-los, mas ainda não temos uma chave para isso. Utilize o apk debug.

# Após a instalação em um dispositivo
Este passos só se aplicam caso você esteja usando um dispositivo para testar/desenvolver o app.
Com o app instalado e aberto, balance o dispositivo para abrir o menu de desenvolvimento do react-native.

No menu, siga este caminho:
Dev Settings > Debug server host & port for device

Insira seu ip e porta (provavelmente 8081).

Após seguir estes passos, balance o dispositivo novamente, e escolha a opção 'Reload'. Certifique-se de estar com o packager rodando (react-native start). Após o reload, talvez seja necessário fechar o app e abri-lo novamente para que funcione corretamente.

Agora você pode fazer mudanças nos arquivos js (mudanças em arquivos nativos só fazem efeito após gerar um novo apk) e ve-las diretamente no dispositivo. Ligue o hot reload (no menu de desenvolvimento do react-native) para ver mudanças visuais tomando efeito instantaneamente.

# Debuggando no chrome
No menu de desenvolvimento, escolha Debug JS Remotely. Isso irá abrir o debugger no chrome.