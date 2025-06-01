export type ScreenType = 'dashboard' | 'form' | 'list';

export interface NavigationProps {
    currentScreen: ScreenType;
    onChangeScreen: (screen: ScreenType) => void;
}