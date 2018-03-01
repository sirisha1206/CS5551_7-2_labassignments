package com.example.sirishasunkara.firebaseoauth;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

/**
 * Created by Sirisha Sunkara on 2/28/2018.
 */

public class RegisterActivity extends AppCompatActivity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
    }
    public void gotoNextPage(View view) {
        Intent nextPage = new Intent(RegisterActivity.this, MainActivity.class);
        startActivity(nextPage);

    }
}
