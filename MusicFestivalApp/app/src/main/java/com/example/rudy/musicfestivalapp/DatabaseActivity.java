package com.example.rudy.musicfestivalapp;

import android.app.Activity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.NotificationCompat;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.app.ListActivity;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import com.example.rudy.musicfestivalapp.DataBase.ArtistDataSource;
import com.example.rudy.musicfestivalapp.Model.Artist;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import java.util.ArrayList;
import java.util.List;

import static com.google.android.gms.internal.zzs.TAG;

public class DatabaseActivity extends ListActivity {

    private ArtistDataSource artistDataSource;

    private DatabaseReference mRootRef = FirebaseDatabase.getInstance().getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        artistDataSource = new ArtistDataSource(this);

        artistDataSource.open();

        final List<String> artists = new ArrayList<>();

        final ArrayAdapter<String> adapter = new ArrayAdapter<>
                (this, android.R.layout.simple_list_item_1, artists);

        setListAdapter(adapter);

        mRootRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                for (DataSnapshot postSnapshot: dataSnapshot.getChildren()) {
                    Artist post = postSnapshot.getValue(Artist.class);
                    Log.e("Get Data", post.getName());
                    artists.add(post.toString());
                }

                adapter.notifyDataSetChanged();
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                dataSnapshot.getRef().removeValue();
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

    }

    @Override
    public void onListItemClick(ListView l, View v, final int position, long id) {

        AlertDialog.Builder alertDialog = new AlertDialog.Builder(DatabaseActivity.this);

        LayoutInflater factory = LayoutInflater.from(DatabaseActivity.this);

                alertDialog.setMessage("Do you really want to delete the artist?");

                alertDialog.setPositiveButton("Yes", new DialogInterface.OnClickListener(){

                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        String artist = (String)getListAdapter().getItem(position);
                        String[] art = artist.split(" ");

                        Query delete = mRootRef.child("Artist").orderByChild("name").equalTo(art[0]);

                        delete.addListenerForSingleValueEvent(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                            }
                        });

                        Log.e("Get Data", art[0]);

                        ArrayAdapter<String> adapter = (ArrayAdapter<String>)getListAdapter();
                        adapter.remove(artist.toString());
                    }
                });

                alertDialog.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                    }
                });

                AlertDialog alerrt = alertDialog.create();
                alerrt.show();
    }

    public void onClick(View view) {
        @SuppressWarnings("unchecked")
        ArrayAdapter<Artist> adapter = (ArrayAdapter<Artist>) getListAdapter();
        switch (view.getId()) {
            case R.id.add:

                EditText edit = (EditText)findViewById(R.id.name);
                String name = edit.getText().toString();
                edit = (EditText)findViewById(R.id.time);
                String time =edit.getText().toString();
                edit = (EditText)findViewById(R.id.detail);
                String details = edit.getText().toString();

                 Artist artist = new Artist();
                artist.setName(name);
                artist.setDetails(details);
                artist.setTime(time);
                mRootRef.child("Artist").push().setValue(artist);
                adapter.add(artist);
                addNotification();
                break;
            case R.id.main:
                Intent i = new Intent(DatabaseActivity.this, MainActivity.class);
                startActivity(i);

        }
        adapter.notifyDataSetChanged();
    }

    private void addNotification() {
        android.support.v4.app.NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.abc)
                .setContentTitle("Artist added").setContentText("An artist has just been added");

        Intent notifiction = new Intent(this, DatabaseActivity.class);
        PendingIntent content = PendingIntent.getActivities(this, 0, new Intent[]{notifiction},
                PendingIntent.FLAG_UPDATE_CURRENT);

        builder.setContentIntent(content);

        NotificationManager manager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
        manager.notify(0, builder.build());
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
