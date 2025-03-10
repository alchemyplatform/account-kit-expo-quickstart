export enum MenuItemType {
	DESTRUCTIVE = "destructive",
	DEFAULT = "default",
}

export interface MenuItemsArgs {
	actions: {
		signOut: () => void;
	};
}

export interface MenuItepProps {
	label: string;
	Icon: ({ color }: { color?: string }) => React.JSX.Element;
	action: () => void;
	style?: MenuItemType;
}
