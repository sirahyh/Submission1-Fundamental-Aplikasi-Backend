const ClientError = require('../exceptions/ClientError');

class AlbumsHandler{

    constructor(service, validator) {
        this._service = service;        
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name, year } = request.payload;
            const albumId = await this._service.addAlbum({ name, year });
        
            const response = h.response({
                status: 'success',
                data: {
                    albumId : albumId,
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
                message: error,
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }

    async getAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id);
        
            const response = h.response({
                status: 'success',
                data: {
                    album : album
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

    async putAlbumByIdHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { id } = request.params;
            const { name, year } = request.payload;

            
            await this._service.editAlbumById(id, { name, year });
        
            const response = h.response({
                status: 'success',
                message: 'Album Berhasil diperbaharui',
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

    async deleteAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
        
            await this._service.deleteAlbumById(id);
        
            const response = h.response({
                status: 'success',
                message: 'Album Berhasil dihapus',
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

module.exports = AlbumsHandler;