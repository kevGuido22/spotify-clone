interface props{
    playlistId: string;
}

export function useFetchPlaylist ({playlistId}: props){

    const getPlaylist = async () => {
        const response = await fetch(`/api/get-info-playlist.json?id=${playlistId}`);
        const data = await response.json();
        const { playlist, songs } = data;

        return [playlist, songs]
    }

    return getPlaylist();
}