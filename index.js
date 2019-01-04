var afs;
var BrowserFS = BrowserFS;
var Module = {
    noInitialRun: true,
    arguments: ["-v", "--menu"],
    preRun: [],
    postRun: [],
    print: (function () { })(),
    printErr: function (text) { },
    canvas: document.getElementById("canvas"),
    setStatus: function (text) { },
    totalDependencies: 0,
    monitorRunDependencies: function (left) { }
};

function startFileSystem() {
    localStorage.clear();
    if (BrowserFS.FileSystem.IndexedDB.isAvailable()) {
        var req = indexedDB.deleteDatabase("RetroArch");
        req.onsuccess = function () { };
        req.onerror = function () { };
        req.onblocked = function () { };
    }
    var imfs = new BrowserFS.FileSystem.InMemory();
    var setupFileSystem = false;
    if (BrowserFS.FileSystem.IndexedDB.isAvailable()) {
        afs = new BrowserFS.FileSystem.AsyncMirror(
            imfs,
            new BrowserFS.FileSystem.IndexedDB(function (e, fs) {
                if (e) {
                    afs = new BrowserFS.FileSystem.InMemory();
                    setupFileSystem = true;
                } else {
                    afs.initialize(function (e) {
                        if (e) {
                            afs = new BrowserFS.FileSystem.InMemory();
                            setupFileSystem = true;
                        } else {
                            setupFileSystem = true;
                        }
                    });
                }
            }, "RetroArch"));
    }

    if (setupFileSystem == true) {
        var mfs = new BrowserFS.FileSystem.MountableFileSystem();
        mfs.mount("/home/web_user/retroarch/userdata", afs);
        BrowserFS.initialize(mfs);
        var BFS = new BrowserFS.EmscriptenFS();
        FS.mount(BFS, { root: "/home" }, "/home");
    }
}

function loadRomIntoVD(data) {
    // STARTS THE VIRTUAL FILE SYSTEM
    startFileSystem();

    // CREATES THE ROM FILE IN THE VIRTUAL DRIVE
    var dataView = new Uint8Array(data);
    FS.createDataFile("/", "game.bin", dataView, true, false);

    // CREATES THE FOLDERS IN THE VIRTUAL DRIVE IN ORDER TO SAVE THE CONFIG FILE
    FS.createFolder("/home/web_user", "retroarch", true, true);
    FS.createFolder("/home/web_user/retroarch", "userdata", true, true);

    // SET THE VARIABLE FOR EMPTY VALUE IN THE CONFIG FILE. USING RETROARCH WEB IN MAC HAS A BUG THAT
    // ANY NULL KEY IS FIRED AS THE COMMAND KEY. THAT'S WHY IS SCROLL_BACK INSTEAD OF NUL. THERE IS
    // ANOTHER BUG IN MAC WITH THE COMMAND KEY, THAT IS FIRED AS THE TURBO BUTTON, NO MATTER THE CONFIG.
    var emptyValue = "scroll_lock";

    // CREATES THE VARIABLE FOR THE CONFIGURATION FILE
    var config = "";

    // SETS THE DEFAULT FOLDER WHEN BROWSING THE VIRTUAL DRIVE
    config += "rgui_browser_directory = /\n";

    // SETS THE KEY FOR THE START BUTTON
    config += "input_player1_start = enter\n";

    // SETS THE KEYS FOR THE BUTTONS A, B, C
    config += "input_player1_y = a\n";
    config += "input_player1_b = s\n";
    config += "input_player1_a = d\n";

    // SETS THE KEYS FOR THE BUTTONS X, Y, Z
    config += "input_player1_l = q\n";
    config += "input_player1_x = w\n";
    config += "input_player1_r = e\n";

    // SETS THE KEYS FOR UNWANTED FUNCTIONS
    config += "input_toggle_fast_forward = " + emptyValue + "\n";
    config += "input_hold_fast_forward = " + emptyValue + "\n";
    config += "input_toggle_slowmotion = " + emptyValue + "\n";
    config += "input_hold_slowmotion = " + emptyValue + "\n";
    config += "input_save_state = " + emptyValue + "\n";
    config += "input_load_state = " + emptyValue + "\n";
    config += "input_toggle_fullscreen = " + emptyValue + "\n";
    config += "input_exit_emulator = " + emptyValue + "\n";
    config += "input_state_slot_increase = " + emptyValue + "\n";
    config += "input_state_slot_decrease = " + emptyValue + "\n";
    config += "input_rewind = " + emptyValue + "\n";
    config += "input_movie_record_toggle = " + emptyValue + "\n";
    config += "input_pause_toggle = " + emptyValue + "\n";
    config += "input_frame_advance = " + emptyValue + "\n";
    config += "input_reset = " + emptyValue + "\n";
    config += "input_shader_next = " + emptyValue + "\n";
    config += "input_shader_prev = " + emptyValue + "\n";
    config += "input_cheat_index_plus = " + emptyValue + "\n";
    config += "input_cheat_index_minus = " + emptyValue + "\n";
    config += "input_cheat_toggle = " + emptyValue + "\n";
    config += "input_screenshot = " + emptyValue + "\n";
    config += "input_audio_mute = " + emptyValue + "\n";
    config += "input_osk_toggle = " + emptyValue + "\n";
    config += "input_netplay_game_watch = " + emptyValue + "\n";
    config += "input_enable_hotkey = " + emptyValue + "\n";
    config += "input_volume_up = " + emptyValue + "\n";
    config += "input_volume_down = " + emptyValue + "\n";
    config += "input_overlay_next = " + emptyValue + "\n";
    config += "input_disk_eject_toggle = " + emptyValue + "\n";
    config += "input_disk_next = " + emptyValue + "\n";
    config += "input_disk_prev = " + emptyValue + "\n";
    config += "input_grab_mouse_toggle = " + emptyValue + "\n";
    config += "input_game_focus_toggle = " + emptyValue + "\n";
    config += "input_menu_toggle = " + emptyValue + "\n";
    config += "input_recording_toggle = " + emptyValue + "\n";
    config += "input_streaming_toggle = " + emptyValue + "\n";

    // PLAYER 1
    config += "input_player1_l2 = " + emptyValue + "\n";
    config += "input_player1_l3 = " + emptyValue + "\n";
    config += "input_player1_r2 = " + emptyValue + "\n";
    config += "input_player1_r3 = " + emptyValue + "\n";
    config += "input_player1_l_x_plus = " + emptyValue + "\n";
    config += "input_player1_l_x_minus = " + emptyValue + "\n";
    config += "input_player1_l_y_plus = " + emptyValue + "\n";
    config += "input_player1_l_y_minus = " + emptyValue + "\n";
    config += "input_player1_r_x_plus = " + emptyValue + "\n";
    config += "input_player1_r_x_minus = " + emptyValue + "\n";
    config += "input_player1_r_y_plus = " + emptyValue + "\n";
    config += "input_player1_r_y_minus = " + emptyValue + "\n";
    config += "input_player1_gun_trigger = " + emptyValue + "\n";
    config += "input_player1_gun_offscreen_shot = " + emptyValue + "\n";
    config += "input_player1_gun_aux_a = " + emptyValue + "\n";
    config += "input_player1_gun_aux_b = " + emptyValue + "\n";
    config += "input_player1_gun_aux_c = " + emptyValue + "\n";
    config += "input_player1_gun_start = " + emptyValue + "\n";
    config += "input_player1_gun_select = " + emptyValue + "\n";
    config += "input_player1_gun_dpad_up = " + emptyValue + "\n";
    config += "input_player1_gun_dpad_down = " + emptyValue + "\n";
    config += "input_player1_gun_dpad_left = " + emptyValue + "\n";
    config += "input_player1_gun_dpad_right = " + emptyValue + "\n";
    config += "input_player1_turbo = " + emptyValue + "\n";

    // PLAYER 2
    config += "input_player2_up = " + emptyValue + "\n";
    config += "input_player2_down = " + emptyValue + "\n";
    config += "input_player2_left = " + emptyValue + "\n";
    config += "input_player2_right = " + emptyValue + "\n";
    config += "input_player2_start = " + emptyValue + "\n";
    config += "input_player2_select = " + emptyValue + "\n";
    config += "input_player2_a = " + emptyValue + "\n";
    config += "input_player2_b = " + emptyValue + "\n";
    config += "input_player2_x = " + emptyValue + "\n";
    config += "input_player2_y = " + emptyValue + "\n";
    config += "input_player2_l = " + emptyValue + "\n";
    config += "input_player2_l2 = " + emptyValue + "\n";
    config += "input_player2_l3 = " + emptyValue + "\n";
    config += "input_player2_r = " + emptyValue + "\n";
    config += "input_player2_r2 = " + emptyValue + "\n";
    config += "input_player2_r3 = " + emptyValue + "\n";
    config += "input_player2_l_x_plus = " + emptyValue + "\n";
    config += "input_player2_l_x_minus = " + emptyValue + "\n";
    config += "input_player2_l_y_plus = " + emptyValue + "\n";
    config += "input_player2_l_y_minus = " + emptyValue + "\n";
    config += "input_player2_r_x_plus = " + emptyValue + "\n";
    config += "input_player2_r_x_minus = " + emptyValue + "\n";
    config += "input_player2_r_y_plus = " + emptyValue + "\n";
    config += "input_player2_r_y_minus = " + emptyValue + "\n";
    config += "input_player2_gun_trigger = " + emptyValue + "\n";
    config += "input_player2_gun_offscreen_shot = " + emptyValue + "\n";
    config += "input_player2_gun_aux_a = " + emptyValue + "\n";
    config += "input_player2_gun_aux_b = " + emptyValue + "\n";
    config += "input_player2_gun_aux_c = " + emptyValue + "\n";
    config += "input_player2_gun_start = " + emptyValue + "\n";
    config += "input_player2_gun_select = " + emptyValue + "\n";
    config += "input_player2_gun_dpad_up = " + emptyValue + "\n";
    config += "input_player2_gun_dpad_down = " + emptyValue + "\n";
    config += "input_player2_gun_dpad_left = " + emptyValue + "\n";
    config += "input_player2_gun_dpad_right = " + emptyValue + "\n";
    config += "input_player2_turbo = " + emptyValue + "\n";

    // SETS THE VIDEO CONFIGURATION
    var container_width = document.getElementById("canvas").offsetWidth;
    var container_height = document.getElementById("canvas").offsetHeight;
    config += "video_vsync = true\n";
    config += "video_scale = 1\n";
    config += "video_window_x = " + container_width + "\n";
    config += "video_window_y = " + container_height + "\n";
    config += "aspect_ratio_index = 23\n";
    config += "custom_viewport_width = " + container_width + "\n";
    config += "custom_viewport_height = " + container_height + "\n";
    config += "custom_viewport_x = 0\n";
    config += "custom_viewport_y = 0\n";

    // SETS THE AUDIO LATENCY
    config += "audio_latency = 128\n";

    // HIDES THE NOTIFICATION MESSAGES
    config += "video_message_pos_x = -100\n";
    config += "video_message_pos_y = -100\n";

    // CREATES THE FILE WITH THE CONFIGURATION
    FS.createDataFile("/home/web_user/retroarch/userdata", "retroarch.cfg", config, true, true);

    // RUNS THE EMULATOR WITH THE SELECTED ROM
    Module.callMain(["-v", "/game.bin"]);
}

function loadGame() {
    document.getElementById("load-game").style.display = "none";
    fetch('./rock-n-roll-genesis.bin')
        .then(data => data.arrayBuffer())
        .then(loadRomIntoVD);
}

