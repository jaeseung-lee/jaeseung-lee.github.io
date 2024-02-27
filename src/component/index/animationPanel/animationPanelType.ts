export enum AnimationPanelType {
  LAYOUT_ID,
  ZOOM_SLIDE_SHOW,
}

export const animationPanelTypeToString = (
  animationPanelType: AnimationPanelType
) => {
  switch (animationPanelType) {
    case AnimationPanelType.LAYOUT_ID: {
      return "LayoutId";
    }
    case AnimationPanelType.ZOOM_SLIDE_SHOW: {
      return "Zoom Slide Show";
    }
  }
};
