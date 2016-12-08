package com.example.rudy.musicfestivalapp.DataBase;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Created by rudy on 08.12.2016.
 */

public class MySqlHelper extends SQLiteOpenHelper {

    public static final String TABLE_ARTISTS = "artists";
    public static final String COLUMN_ID = "_id";
    public static final String COLUMN_ARTIST = "artist";
    public static final String COLUMN_TIME = "time";
    public static final String COLUMN_DETAILS = "details";

    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "musicfestival.db";

    private static final String DATABASE_CREATE = "create table " + TABLE_ARTISTS + "( " +
            COLUMN_ID + " integer primary key autoincrement, " + COLUMN_ARTIST + " text not null, "
            + COLUMN_TIME + " text not null, " + COLUMN_DETAILS + " text not null);";

    public MySqlHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(DATABASE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int old, int neW) {
        Log.w(MySqlHelper.class.getName(),
                "Upgrading database from version " + old + " to "
                        + neW + ", which will destroy all old data");
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + TABLE_ARTISTS);
        onCreate(sqLiteDatabase);
    }
}
