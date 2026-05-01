import type { FC } from 'react';
import { IsometricServersWrapper } from './IsometricServers';
import { PadlockWrapper } from './Padlock';

export interface AnimationDefinition {
  id: string;
  title: string;
  description: string;
  component: FC<any>;
}

export const animations: Record<string, AnimationDefinition> = {};

export function registerAnimation(def: AnimationDefinition) {
  animations[def.id] = def;
}

registerAnimation({
  id: 'isometric-servers',
  title: 'Isometric Servers',
  description: 'Floating isometric server nodes with data streams.',
  component: IsometricServersWrapper,
});

registerAnimation({
  id: 'minimal-padlock',
  title: 'Minimal Padlock',
  description: 'A glowing padlock with particle physics and mechanical states.',
  component: PadlockWrapper,
});
