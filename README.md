# Back-end
DATABASE_URL="file:../src/database/db.sqlite"
## Entidades

### Game 

id
title
bannerUrl

### Ad 

id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt


## Casos de uso

- Listagem de games com contagem de anúncios
- Crição de novo anúncio
- Listagem de anúncios por game
- Buscar discord pelo ID do anúncio