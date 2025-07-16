# Components

This directory contains reusable React Native components.

## Structure

- Create component files with `.js` or `.jsx` extension
- Use PascalCase for component names
- Export components as default exports

## Example

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default MyComponent;
```
