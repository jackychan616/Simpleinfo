import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function Sub({children}) {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <div style={{position:"relative",top:"0px"}}>
        <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="訂閱最新精彩文章"
          placeholder="電郵地址"
          {...form.getInputProps('email')}
        />

        <Checkbox
          mt="md"
          label="訂閱以獲取最新資訊"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
        </form>
        </Box>
    </div>
  );
}

