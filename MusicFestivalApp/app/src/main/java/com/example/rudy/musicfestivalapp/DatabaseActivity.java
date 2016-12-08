package com.example.rudy.musicfestivalapp;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.app.ListActivity;
import android.widget.ArrayAdapter;
import android.widget.EditText;

import com.example.rudy.musicfestivalapp.DataBase.ArtistDataSource;
import com.example.rudy.musicfestivalapp.Model.Artist;

import java.util.List;
import java.util.Random;

public class DatabaseActivity extends ListActivity {

    private ArtistDataSource artistDataSource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        artistDataSource = new ArtistDataSource(this);

        artistDataSource.open();

        List<Artist> values = artistDataSource.getAlArtists();

        ArrayAdapter<Artist> adapter = new ArrayAdapter<Artist>
                (this, android.R.layout.simple_list_item_1, values);

        setListAdapter(adapter);
    }

    public void onClick(View view) {
        @SuppressWarnings("unchecked")
        ArrayAdapter<Artist> adapter = (ArrayAdapter<Artist>) getListAdapter();
        Artist artist = null;
        switch (view.getId()) {
            case R.id.add:

                EditText edit = (EditText)findViewById(R.id.name);
//                String name = "artist";
                String name = edit.getText().toString();
//                String time = "20:00";
                edit = (EditText)findViewById(R.id.time);
                String time =edit.getText().toString();
                edit = (EditText)findViewById(R.id.detail);
                String details = edit.getText().toString();

//                String details = "live";

                artist = artistDataSource.createArtist(name, time, details);
                adapter.add(artist);
                break;
            case R.id.delete:
                if (getListAdapter().getCount() > 0) {
                    edit = (EditText)findViewById(R.id.deleteId);
                    String deleteId = edit.getText().toString();
                    artist = (Artist) getListAdapter().getItem(Integer.parseInt(deleteId));
                    artistDataSource.deleteArtist(artist);
                    adapter.remove(artist);
                }
                break;
        }
        adapter.notifyDataSetChanged();
    }

    @Override
    protected void onResume() {
        artistDataSource.open();
        super.onResume();
    }

    @Override
    protected void onPause() {
        artistDataSource.close();
        super.onPause();
    }


}
