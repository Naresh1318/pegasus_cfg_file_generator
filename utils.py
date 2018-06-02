
def generate_config_file(data):
    """
    Generates a temporary CSV file that contains the data for the selected variable table name.
    :param:
    :return:
    """
    cfg_file_path = "./cfg_file.cfg"
    template_cfg_file = "./template_cfg_file.cfg"
    channel_number = 0

    with open(template_cfg_file, "r") as template_file:

        template_content = template_file.read()

        with open(cfg_file_path, "w") as cfg_file:
            cfg_file.write(template_content)

    channel_number = add_macro_channels(data, cfg_file_path, channel_number)
    _ = add_micro_channels(data, cfg_file_path, channel_number)

    return cfg_file_path


def add_macro_channels(data, cfg_file_path, channel_number):

    with open(cfg_file_path, "a") as cfg_file:
        macro_channels = data["macro_channels_added"]

        for k, v in macro_channels.items():
            for i in range(int(v)):
                current_key = k[:-1] + str(i+1)

                # Add cfg comment
                cfg_file.write("#Acquisition Entity creation and setup for: {}\n".format(current_key))

                # Add channel to cfg file
                for a_k, a_v in data["macros"].items():
                    if a_k == "SetChannelNumber":
                        cfg_file.write("""-{} "{}" {}\n""".format(a_k, current_key, channel_number))
                        channel_number += 1
                    elif a_k == "CreateCscAcqEnt":
                        cfg_file.write("""-{} "{}" "{}"\n""".format(a_k, current_key, a_v))
                    else:
                        cfg_file.write("""-{} "{}" {}\n""".format(a_k, current_key, a_v))

                cfg_file.write("""\n""")
        return channel_number


def add_micro_channels(data, cfg_file_path, channel_number):

    with open(cfg_file_path, "a") as cfg_file:
        macro_channels = data["macro_channels_added"]

        for k, v in macro_channels.items():
            for i in range(int(v)):
                current_key = k[:-1] + str(i+1)

                # Add cfg comment
                cfg_file.write("#Acquisition Entity creation and setup for: {}\n".format(current_key))

                # Add channel to cfg file
                for a_k, a_v in data["macros"].items():
                    if a_k == "SetChannelNumber":
                        cfg_file.write("""-{} "{}" {}\n""".format(a_k, current_key, channel_number))
                        channel_number += 1
                    elif a_k == "CreateCscAcqEnt":
                        cfg_file.write("""-{} "{}" "{}"\n""".format(a_k, current_key, a_v))
                    else:
                        cfg_file.write("""-{} "{}" {}\n""".format(a_k, current_key, a_v))

                cfg_file.write("""\n""")
        return channel_number

