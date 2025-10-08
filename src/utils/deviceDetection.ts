/**
 * Detects if the user is on a mobile device
 */
export const isMobileDevice = (): boolean => {
  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check user agent for mobile indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
  
  // Check screen width (mobile typically < 768px)
  const isSmallScreen = window.innerWidth < 768;
  
  return (hasTouch && isMobileUA) || (hasTouch && isSmallScreen);
};

/**
 * Checks if the device supports camera capture
 */
export const supportsCameraCapture = (): boolean => {
  return isMobileDevice() && 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
};
