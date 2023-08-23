declare module 'react-native-invertible-scroll-view' {
  import { ComponentType } from 'react';
  import { ScrollViewProps } from 'react-native';

  interface InvertibleScrollViewProps extends ScrollViewProps {
    inverted?: boolean;
  }

  const InvertibleScrollView: ComponentType<InvertibleScrollViewProps>;
  export default InvertibleScrollView;
}