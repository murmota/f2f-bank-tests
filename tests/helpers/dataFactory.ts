export function generateUser(overrides: any = {}) {
  const timestamp = Date.now();
  return {
    firstName: overrides.firstName ?? 'Test',
    lastName: overrides.lastName ?? 'User',
    email: overrides.email ?? `user_${timestamp}@example.com`,
    password: overrides.password ?? 'Password123!',
    phone: `+7${Math.floor(1000000000 + Math.random() * 8999999999)}`,
    ...overrides,
  };
}

export function generateLongString(length: number, char = 'a'): string {
  return char.repeat(length);
}