package com.spacecraft.game.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.spacecraft.game.SpaceCraft;

public class DesktopLauncher
{
    public static void main(String[] arg)
    {
        new LwjglApplication(new SpaceCraft(), getConfiguration());
    }

    private static LwjglApplicationConfiguration getConfiguration()
    {
        LwjglApplicationConfiguration cfg = new LwjglApplicationConfiguration();

        cfg.title = "SpaceCraft";

        cfg.width = 1024;
        cfg.height = 768;

        cfg.vSyncEnabled = true;
        cfg.useGL30 = true;
        cfg.resizable = false;

        return cfg;
    }
}
