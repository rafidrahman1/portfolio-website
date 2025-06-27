export type DeviceType = 'laptop' | 'mobile';

export interface ShowcaseProject {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    demoUrl: string;
    deviceType: DeviceType;
    featured?: boolean;
}
