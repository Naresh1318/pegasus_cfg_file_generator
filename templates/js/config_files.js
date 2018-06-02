
let vue_dashboard = new Vue({
    el: '#vue-dashboard',
    data: {
        all_outputs: {
            // file name
            file_name: "default",

            // Micros
            micros: {
                s_CreateCscAcqEnt: "AcqSystem1",
                s_SetAcqEntProcessingEnabled: "True",
                s_SetChannelNumber: "auto increment",
                s_SetAcqEntReference: "192",
                s_SetInputRange: "1000",
                s_SetDspLowCutFilterEnabled: "True",
                s_SetDspLowCutFrequency: "300",
                s_SetDspLowCutNumberTaps: "256",
                s_SetDspHighCutFilterEnabled: "True",
                s_SetDspHighCutFrequency: "6000",
                s_SetDspHighCutNumberTaps: "256",
                s_SetSubSamplingInterleave: "1",
                s_SetInputInverted: "True",
                s_SetNetComDataBufferingEnabled: "False",
                s_SetNetComDataBufferSize: "3000",
            },


            // Macros
            macros: {
                CreateCscAcqEnt: "AcqSystem1",
                SetAcqEntProcessingEnabled: "True",
                SetChannelNumber: "auto increment",
                SetAcqEntReference: "32000000",
                SetInputRange: "1000",
                SetDspLowCutFilterEnabled: "True",
                SetDspLowCutFrequency: "0.1",
                SetDspLowCutNumberTaps: "0",
                SetDspHighCutFilterEnabled: "True",
                SetDspHighCutFrequency: "500",
                SetDspHighCutNumberTaps: "256",
                SetSubSamplingInterleave: "16",
                SetInputInverted: "True",
                SetNetComDataBufferingEnabled: "False",
                SetNetComDataBufferSize: "3000",
            },

            // channels added
            macro_channels_added: {},
            micro_channels_added: {},
        },


        // Console
        console_output: "",

        // Add channel
        micro_channel_name: "SAHipp-3Ld1",
        micro_n_channels: "16",
        macro_channel_name: "Amg-1Ld1",
        macro_n_channels: "12",

    },
    methods: {
        download_config_file: function () {
            /*
            Send an Async request to download the config file.
             */
            let rq = new XMLHttpRequest();

            rq.onreadystatechange = function (vm) {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        let blob = new Blob([this.responseText]);
                        // IE hack;
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(blob, vm.all_outputs.file_name + ".cfg");
                        }
                        else {
                            let a = window.document.createElement("a");
                            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                            a.download = vm.all_outputs.file_name + ".cfg";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }
                    } else {
                        console.log("Not able to download the requested cfg file.")
                    }
                }
            }.bind(rq, this);
            rq.open("POST", "/download_config_file", true);
            rq.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            rq.send(
                "all_outputs=" + JSON.stringify(this.all_outputs)
            );
        },

        add_micro_channel: function () {
            /*
            Add a micro or macro channel
             */
            this.all_outputs.micro_channels_added[this.micro_channel_name] = this.micro_n_channels;
            this.output_to_console(this.micro_channel_name, this.micro_n_channels, false);

        },

        undo_micro_channel: function () {
            /*
            Add a micro or macro channel
             */
            delete this.all_outputs.micro_channels_added[this.micro_channel_name];
            this.output_to_console(this.micro_channel_name, this.micro_n_channels, true);

        },

        add_macro_channel: function () {
            /*
            Add a macro or macro channel
             */
            this.all_outputs.macro_channels_added[this.macro_channel_name] = this.macro_n_channels;
            this.output_to_console(this.macro_channel_name, this.macro_n_channels, false);
        },

        undo_macro_channel: function () {
            /*
            Add a macro or macro channel
             */
            delete this.all_outputs.macro_channels_added[this.macro_channel_name];
            this.output_to_console(this.macro_channel_name, this.macro_n_channels, true);
        },

        output_to_console: function (channel_name, n_channels, delete_ch) {
            /*
            Console ouput
             */
            if (!delete_ch){
                this.console_output += "\n" + "Channel added: " + channel_name + "  " + "n_channles: " + n_channels + "\n";
            }
            else {
                this.console_output += "\n" + "Channel deleted: " + channel_name + "\n";
            }
        }
    }

});
