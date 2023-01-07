import { createStyles, Card, Avatar, Text, Group, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  banner: string;
  avatar: string;
  name: string;
  description?: string;
  stats?: { label: string; value: string }[];
}

export function ServerCard({
  banner,
  avatar,
  name,
  description,
  stats,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const items = stats?.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          height: 140,
        }}
      />
      <Group>
        <Avatar
          src={avatar}
          size={80}
          radius={80}
          mt={-30}
          className={classes.avatar}
        />
        <Text size="lg" weight={600} mt="sm">
          {name}
        </Text>
      </Group>
      {description && (
        <Text size="sm" color="dimmed">
          {description}
        </Text>
      )}
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
    </Card>
  );
}
