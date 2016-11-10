package com.example.rudy.musicfestivalapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class ItemActivity extends AppCompatActivity {

    private Intent resultIntent;
    private EditText et;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        resultIntent = new Intent();

        et = (EditText) findViewById(R.id.editable);
        et.setText((String)getIntent().getExtras().get("TextView"));

        Button btn = (Button) findViewById(R.id.editBtn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String str = ""+et.getText();
                resultIntent.putExtra("EditedText", str);
                resultIntent.putExtra("Position", (int)getIntent().getExtras().get("Position"));
                Log.d("Position"+ getIntent().getExtras().get("Position"),"items");

                setResult(Activity.RESULT_OK, resultIntent);
                finish();
            }
        });


    }

}
