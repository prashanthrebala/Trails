export interface ImageCardProps {
	username: string;
	imageURL: string;
	caption?: string;
	likes?: number;
	location?: {
		latitude: number;
		longitude: number;
	};
}
