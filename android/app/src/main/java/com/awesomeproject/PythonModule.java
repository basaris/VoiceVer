package com.awesomeproject;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.sql.Timestamp;

public class PythonModule extends ReactContextBaseJavaModule{
    Context context;
    String TAG = "Python Running";


    Python py = Python.getInstance();
    PyObject pyobj1 = py.getModule("TrainingModel");
    PyObject pyobj2 = py.getModule("TestingModel");

    PythonModule(ReactApplicationContext context) {
        super(context);
        this.context = context.getApplicationContext();


    }



    @NonNull
    @Override
    public String getName() {
        return "PythonModule";
    }


    @ReactMethod
    public void passingToPython (String params, Promise promise) {
        PyObject obj1 = pyobj1.callAttr("TrainModel", params);
        String result = obj1.toString();
        try {
            //Toast.makeText(getReactApplicationContext(),"passing only " + result,Toast.LENGTH_SHORT).show();
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Create Function  Error", e);
        }
    }

    @ReactMethod
    public void openFile(String params, Promise promise) {
        PyObject obj2 = pyobj2.callAttr("TestModel", params);
        String result = obj2.toString();
        try {
//            Toast.makeText(getReactApplicationContext(),"passing only " + result,Toast.LENGTH_SHORT).show();
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Create Function  Error", e);
        }
    }
}
