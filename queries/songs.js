const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
       const songs = await db.any('SELECT * FROM songs');
       return songs;
        //db.any query the database, await is waiting for anything after to finish
    } catch(err) {
    return err;
    }
};

const addNewSongs = async(songs) => {
const {name, artist, album, time, is_favorite} = songs;
    try {
    const newSongs = await db.one("INSERT INTO bookmarks (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, artist, album, time, is_favorite]);
    return newSongs;
    }
    catch (err) {
      return err;
    }
}

const getSong = async (id) => {
    try {
      const song = await db.one("SELECT * FROM songs WHERE id=$1", id);//.one returns one item. .any returns an array of one object **sql interpolation**
      
      //const bookmark = await db.one(`select * from bookmarks where ${id} = id)
    return song;
    } 
    catch (error) {
    return error;
    }
  };

  const deleteSong = async(id) => {
      try {
          const song = await db.one("DELETE FROM songs WHERE id=$1", id);
          return song;
      }
      catch(err) {
          return err;
  }
}

const updateSong = async ({name, artist, album, time, is_favorite}, id) => {
    try {
        const song = await db.one("UPDATE songs SET name =$1, artist=$2, album=$3, time=$4, is_favorite= $5 WHERE id=$6 RETURNING *", [name, artist, album, time, is_favorite]);
        return song;
    }
 catch(err){
    return err;
}
}

module.exports = {
getAllSongs,
addNewSongs,
getSong,
deleteSong,
updateSong
}