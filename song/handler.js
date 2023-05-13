class SongsHandler{

    async postSongHandler(request, h) {
        
        const { title, year, genre, performer, duration, albumId } = request.payload;
    
        const response = h.response({
            status: 'success',
            data: {
                songId : 'song_id'
            },
        });
        response.code(201);
        return response;
    }

    async getAllSongHandler(request, h) {
        
        const response = h.response({
            status: 'success',
            data: {
                songs : songs
            },
        });
        response.code(200);
        return response;
    }

    async getSongByIdHandler(request, h) {
        
        const { id } = request.params;
    
        const response = h.response({
            status: 'success',
            data: {
                song : song
            },
        });
        response.code(200);
        return response;
    }

    async putSongByIdHandler(request, h) {
        
        const { id } = request.params;
        const { title, year, genre, performer, duration, albumId } = request.payload;
    
    
        const response = h.response({
            status: 'success',
            message: 'Lagu Berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }

    async deleteSongByIdHandler(request, h) {
        
        const { id } = request.params;
    
        const response = h.response({
            status: 'success',
            message: 'Lagu Berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}

module.exports = SongsHandler;