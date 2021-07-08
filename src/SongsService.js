const { Pool } = require('pg');
 
class SongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getSongs(userId) {
    const query = {
      text: `SELECT songs.* FROM songs
      LEFT JOIN collaborations ON collaborations.song_id = songs.id
      WHERE songs.owner = $1 OR collaborations.user_id = $1
      GROUP BY songs.id`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = SongsService;