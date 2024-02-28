// naive-ui-discrete-api.ts
import { createDiscreteApi } from 'naive-ui';

// 使用 createDiscreteApi 初始化，这里我们只初始化了 message，您可以根据需要添加更多
const { message } = createDiscreteApi(['message']);

export { message };