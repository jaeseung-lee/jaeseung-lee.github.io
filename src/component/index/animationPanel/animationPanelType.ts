export enum AnimationPanelType {
  LAYOUT_ID,
  GRAPH,
  ZOOM_SLIDE_SHOW,
  VIEW_BOX,
  CARD_SPLITTER,
}

export const animationPanelTypeToString = (
  animationPanelType: AnimationPanelType
) => {
  switch (animationPanelType) {
    case AnimationPanelType.LAYOUT_ID: {
      return "LayoutId";
    }
    case AnimationPanelType.GRAPH: {
      return "Graph";
    }
    case AnimationPanelType.ZOOM_SLIDE_SHOW: {
      return "Zoom Slide Show";
    }
    case AnimationPanelType.VIEW_BOX: {
      return "View Box";
    }
    case AnimationPanelType.CARD_SPLITTER: {
      return "Card Splitter";
    }
  }
};
