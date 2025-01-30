import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";

import { useAlchemyAuthSession } from "@/src/context/AlchemyAuthSessionProvider";
import { AuthenticatingState } from "@/src/context/types";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const { authState } = useAlchemyAuthSession();

	if (authState === AuthenticatingState.UNAUTHENTICATED) {
		return <Redirect href={"/sign-in"} />;
	}

	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Tab One",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					),
					headerRight: () => (
						<Link href="/otp-modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					title: "Tab Two",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
