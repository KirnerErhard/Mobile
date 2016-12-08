package com.example.rudy.musicfestivalapp.DataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;

import com.example.rudy.musicfestivalapp.Model.Artist;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by rudy on 08.12.2016.
 */

public class ArtistDataSource {

    private SQLiteDatabase database;
    private MySqlHelper dbHelper;
    private String[] allColumns =
            {
                    MySqlHelper.COLUMN_ID, MySqlHelper.COLUMN_ARTIST,
                    MySqlHelper.COLUMN_TIME, MySqlHelper.COLUMN_DETAILS
            };

    public ArtistDataSource(Context context){
        dbHelper = new MySqlHelper(context);
    }

    public void open() throws SQLException{
        database = dbHelper.getWritableDatabase();
    }

    public void close(){
        dbHelper.close();
    }

    public Artist createArtist(String name, String time, String details){
        ContentValues values = new ContentValues();
        values.put(MySqlHelper.COLUMN_ARTIST, name);
        values.put(MySqlHelper.COLUMN_TIME, time);
        values.put(MySqlHelper.COLUMN_DETAILS, details);

        long id = database.insert(MySqlHelper.TABLE_ARTISTS, null, values);

        Cursor cursor = database.query(MySqlHelper.TABLE_ARTISTS, allColumns,
                MySqlHelper.COLUMN_ID + "=" + id
                , null, null, null, null);

        cursor.moveToFirst();
        Artist artist = cursorToArtist(cursor);
        cursor.close();

        return artist;
    }

    public void deleteArtist(Artist artist){
        long id = artist.getId();
        database.delete(MySqlHelper.TABLE_ARTISTS, MySqlHelper.COLUMN_ID + " = " + id,
                null);

    }

    public List<Artist> getAlArtists(){
        List<Artist> artists = new ArrayList<Artist>();

        Cursor cursor = database.query(MySqlHelper.TABLE_ARTISTS, allColumns,
                null, null, null, null, null);

        cursor.moveToFirst();
        while (!cursor.isAfterLast()){
            Artist artist = cursorToArtist(cursor);
            artists.add(artist);
            cursor.moveToNext();
        }
        cursor.close();
        return artists;
    }

    private Artist cursorToArtist(Cursor cursor) {
        Artist artist = new Artist();
        artist.setId(cursor.getLong(0));
        artist.setName(cursor.getString(1));
        artist.setTime(cursor.getString(2));
        artist.setDetails(cursor.getString(3));
        return artist;
    }

}
