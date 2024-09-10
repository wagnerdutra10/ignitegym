import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center style={{ flex: 1 }} bg="$gray700">
      <Spinner color="$green500" />
    </Center>
  );
}
