export type MergeableProps = Pick<React.HTMLAttributes<Element>,
  // Styles
  'className' |
  'style' |

  // Clipboard Events
  'onCopy' |
  'onCopyCapture' |
  'onCut' |
  'onCutCapture' |
  'onPaste' |
  'onPasteCapture' |

  // Composition Events
  'onCompositionEnd' |
  'onCompositionEndCapture' |
  'onCompositionStart' |
  'onCompositionStartCapture' |
  'onCompositionUpdate' |
  'onCompositionUpdateCapture' |

  // Focus Events
  'onFocus' |
  'onFocusCapture' |
  'onBlur' |
  'onBlurCapture' |

  // Form Events
  'onChange' |
  'onChangeCapture' |
  'onInput' |
  'onInputCapture' |
  'onReset' |
  'onResetCapture' |
  'onSubmit' |
  'onSubmitCapture' |
  'onInvalid' |
  'onInvalidCapture' |

  // Image Events
  'onLoad' |
  'onLoadCapture' |
  'onError' |
  'onErrorCapture' |

  // Keyboard Events
  'onKeyDown' |
  'onKeyDownCapture' |
  'onKeyPress' |
  'onKeyPressCapture' |
  'onKeyUp' |
  'onKeyUpCapture' |

  // Media Events
  'onAbort' |
  'onAbortCapture' |
  'onCanPlay' |
  'onCanPlayCapture' |
  'onCanPlayThrough' |
  'onCanPlayThroughCapture' |
  'onDurationChange' |
  'onDurationChangeCapture' |
  'onEmptied' |
  'onEmptiedCapture' |
  'onEncrypted' |
  'onEncryptedCapture' |
  'onEnded' |
  'onEndedCapture' |
  'onLoadedData' |
  'onLoadedDataCapture' |
  'onLoadedMetadata' |
  'onLoadedMetadataCapture' |
  'onLoadStart' |
  'onLoadStartCapture' |
  'onPause' |
  'onPauseCapture' |
  'onPlay' |
  'onPlayCapture' |
  'onPlaying' |
  'onPlayingCapture' |
  'onProgress' |
  'onProgressCapture' |
  'onRateChange' |
  'onRateChangeCapture' |
  'onSeeked' |
  'onSeekedCapture' |
  'onSeeking' |
  'onSeekingCapture' |
  'onStalled' |
  'onStalledCapture' |
  'onSuspend' |
  'onSuspendCapture' |
  'onTimeUpdate' |
  'onTimeUpdateCapture' |
  'onVolumeChange' |
  'onVolumeChangeCapture' |
  'onWaiting' |
  'onWaitingCapture' |

  // Mouse Events
  'onClick' |
  'onClickCapture' |
  'onContextMenu' |
  'onContextMenuCapture' |
  'onDoubleClick' |
  'onDoubleClickCapture' |
  'onDrag' |
  'onDragCapture' |
  'onDragEnd' |
  'onDragEndCapture' |
  'onDragEnter' |
  'onDragEnterCapture' |
  'onDragExit' |
  'onDragExitCapture' |
  'onDragLeave' |
  'onDragLeaveCapture' |
  'onDragOver' |
  'onDragOverCapture' |
  'onDragStart' |
  'onDragStartCapture' |
  'onDrop' |
  'onDropCapture' |
  'onMouseDown' |
  'onMouseDownCapture' |
  'onMouseEnter' |
  'onMouseLeave' |
  'onMouseMove' |
  'onMouseMoveCapture' |
  'onMouseOut' |
  'onMouseOutCapture' |
  'onMouseOver' |
  'onMouseOverCapture' |
  'onMouseUp' |
  'onMouseUpCapture' |

  // Selection Events
  'onSelect' |
  'onSelectCapture' |

  // Touch Events
  'onTouchCancel' |
  'onTouchCancelCapture' |
  'onTouchEnd' |
  'onTouchEndCapture' |
  'onTouchMove' |
  'onTouchMoveCapture' |
  'onTouchStart' |
  'onTouchStartCapture' |

  // UI Events
  'onScroll' |
  'onScrollCapture' |

  // Wheel Events
  'onWheel' |
  'onWheelCapture' |

  // Animation Events
  'onAnimationStart' |
  'onAnimationStartCapture' |
  'onAnimationEnd' |
  'onAnimationEndCapture' |
  'onAnimationIteration' |
  'onAnimationIterationCapture' |

  // Transition Events
  'onTransitionEnd' |
  'onTransitionEndCapture'
>;
