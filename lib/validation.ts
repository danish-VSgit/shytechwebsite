export interface InquiryInput {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  budget?: string;
  message?: string;
}

export type ValidationErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

export function validateInquiry(input: Partial<InquiryInput>): {
  valid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  const name = input.name?.trim() ?? "";
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Full name is too short.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = "Full name is too long.";
  }

  const phone = input.phone?.trim() ?? "";
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  const email = input.email?.trim() ?? "";
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const eventType = input.eventType?.trim() ?? "";
  if (!eventType) {
    errors.eventType = "Please select an event type.";
  }

  if (input.message && input.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitizeInquiry(input: InquiryInput): InquiryInput {
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    eventType: input.eventType.trim(),
    budget: input.budget?.trim() || undefined,
    message: input.message?.trim() || undefined,
  };
}
