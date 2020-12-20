export interface CommandsList {
    groups: Group[];
}

export interface Group {
    name: string;
    description: string;
    commands: Command[];
}

export interface Command {
    name: string;
    description: string;
    required_permissions?: string[];
    usage?: string;
    examples?: Message[];
    aliases?: string[];
}

export interface Message {
    command?: string;
    content?: string;
    bot?: boolean;
}
