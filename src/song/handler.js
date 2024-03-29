class SongsHandler{

    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getAllSongHandler = this.getAllSongHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);        
            const { title, year, genre, performer, duration, albumId } = request.payload;
            const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });
        
            const response = h.response({
                status: 'success',
                data: {
                    songId : 'song_id'
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }

    async getAllSongHandler(h) {
        try {
            const {title, performer} = request.query;
            const songs = await this._service.getSongs({title, performer});
        
            const response = h.response({
                status: 'success',
                data: {
                    songs : songs
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongByIdHandler(request, h) {
        
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
        
            const response = h.response({
                status: 'success',
                data: {
                    song : song
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }

    async putSongByIdHandler(request, h) {

        try {
            this._validator.validateSongPayload(request.payload);
        
            const { id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;
            
            await this._service.editSongById(id, { title, year, genre, performer, duration, albumId });
        
        
            const response = h.response({
                status: 'success',
                message: 'Lagu Berhasil diperbaharui',
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }    
    }

    async deleteSongByIdHandler(request, h) {
        try {
            await this._service.deleteSongById(id);
        
            const { id } = request.params;
        
            const response = h.response({
                status: 'success',
                message: 'Lagu Berhasil dihapus',
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }  
    }
}

module.exports = SongsHandler;