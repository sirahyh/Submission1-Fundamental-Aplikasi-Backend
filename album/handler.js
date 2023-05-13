class AlbumsHandler{

    async postAlbumHandler(request, h) {
        
        const { name, year } = request.payload;
    
        const response = h.response({
            status: 'success',
            data: {
                albumId : 'album_id'
            },
        });
        response.code(201);
        return response;
    }

    async getAlbumByIdHandler(request, h) {
        
        const { id } = request.params;
    
        const response = h.response({
            status: 'success',
            data: {
                album : album
            },
        });
        response.code(200);
        return response;
    }

    async putAlbumByIdHandler(request, h) {
        
        const { id } = request.params;
        const { name, year } = request.payload;
    
        const response = h.response({
            status: 'success',
            message: 'Album Berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }

    async deleteAlbumByIdHandler(request, h) {
        
        const { id } = request.params;
    
        const response = h.response({
            status: 'success',
            message: 'Album Berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}

module.exports = AlbumsHandler;