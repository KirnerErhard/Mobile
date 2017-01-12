package com.example.rudy.musicfestivalapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;


public class MainActivity extends Activity {

    private String[] artists = new String[5];
    private boolean set = true;
    private String str;
    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        addPairs();

        ArrayAdapter<String> adapter = new ArrayAdapter<>
                (this, R.layout.activity_listview, artists);

        listView = (ListView) findViewById(R.id.list);
        listView.setAdapter(adapter);

        listView.setClickable(true);
        listView.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener(){

            @Override
            public void onItemClick(AdapterView<?> av, View v, int position, long id){

                Intent intent = new Intent(MainActivity.this, ItemActivity.class);
                TextView tv = (TextView) v;
                intent.putExtra("TextView", tv.getText());
                intent.putExtra("Position", position);
                Log.d("Position"+ position,"Maine1");
                startActivityForResult(intent, 1);
            }
        });


    }

    public void onClick(View view){
        if(R.id.databaseActivity == view.getId()){
            Intent i = new Intent(MainActivity.this, DatabaseActivity.class);
            startActivity(i);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {
            if(resultCode == RESULT_OK) {
                View v = listView.getChildAt((int)data.getExtras().get("Position")
                        -listView.getFirstVisiblePosition());
                Log.d("Position"+ data.getExtras().get("Position"),"Main2");

                str = (String)data.getExtras().get("EditedText");
                TextView tv = (TextView) v;
                tv.setText(str);
            }
        }
    }

    private void addPairs(){
        artists[0]=("Netsky" + 4);
        artists[1]=("Gorillaz"+ 4);
        artists[2]=("M&m"+ 5);
        artists[3]=("Shady"+ 50);
        artists[4]=("Bob Marley"+ 4);
    }
}
