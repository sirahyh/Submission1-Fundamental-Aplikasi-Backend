// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routesAlbum = require('./album/routes');
const routesSong = require('./song/routes')
const albums = require('./album');
const songs = require('./song')
const AlbumService = require('./services/AlbumService');
const SongService = require('./services/SongService')
const AlbumValidator = require('./validator/validatorAlbum');
const SongValidator = require('./validator/validatorSong')
const album = require('./album');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();