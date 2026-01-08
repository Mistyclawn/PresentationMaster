export interface ShapeElement {
    id: string;
    type: 'rect' | 'circle' | 'text' | 'image';
    x: number;
    y: number;
    width: number;
    height: number;
    content?: string;
    src?: string; // For images
    style?: {
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
        fontFamily?: string;
        borderColor?: string;
        borderWidth?: number;
        [key: string]: any;
    };
}

export interface Slide {
    id: string;
    order: number;
    title: string;
    description: string; // For narrative flow
    script: string;
    duration: number; // in seconds
    elements: ShapeElement[];
    thumbnail?: string; // URL or base64
}

export interface DesignTemplate {
    id: string;
    name: string;
    colors: string[]; // Primary, secondary, etc.
    fontFamily: string;
    backgroundColor: string;
}

export interface ProjectMetadata {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    version: string;
}

export interface ProjectData {
    metadata: ProjectMetadata;
    designTemplate: DesignTemplate;
    slides: Slide[];
}
