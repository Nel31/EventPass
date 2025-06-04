import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
        createSignedUrl: jest.fn(),
      })),
    },
  })),
}));

describe('Supabase Storage Tests', () => {
  let supabase: any;
  const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    supabase = createClient('mock-url', 'mock-key');
  });

  describe('Public Bucket Operations', () => {
    test('should upload file to public bucket successfully', async () => {
      const mockData = { path: 'test.jpg' };
      const mockUpload = jest.fn().mockResolvedValue({ data: mockData, error: null });
      
      supabase.storage.from.mockReturnValue({
        upload: mockUpload,
      });

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload('test.jpg', mockFile);

      expect(error).toBeNull();
      expect(data).toEqual(mockData);
      expect(supabase.storage.from).toHaveBeenCalledWith('event-images');
    });

    test('should handle upload error to public bucket', async () => {
      const mockError = new Error('Upload failed');
      const mockUpload = jest.fn().mockResolvedValue({ data: null, error: mockError });
      
      supabase.storage.from.mockReturnValue({
        upload: mockUpload,
      });

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload('test.jpg', mockFile);

      expect(error).toBe(mockError);
      expect(data).toBeNull();
    });

    test('should get public URL successfully', async () => {
      const mockPublicUrl = 'https://example.com/test.jpg';
      const mockGetPublicUrl = jest.fn().mockReturnValue({ 
        data: { publicUrl: mockPublicUrl }, 
        error: null 
      });
      
      supabase.storage.from.mockReturnValue({
        getPublicUrl: mockGetPublicUrl,
      });

      const { data, error } = supabase.storage
        .from('event-images')
        .getPublicUrl('test.jpg');

      expect(error).toBeNull();
      expect(data.publicUrl).toBe(mockPublicUrl);
    });
  });

  describe('Private Bucket Operations', () => {
    test('should upload file to private bucket successfully', async () => {
      const mockData = { path: 'ticket.pdf' };
      const mockUpload = jest.fn().mockResolvedValue({ data: mockData, error: null });
      
      supabase.storage.from.mockReturnValue({
        upload: mockUpload,
      });

      const { data, error } = await supabase.storage
        .from('tickets')
        .upload('ticket.pdf', mockFile);

      expect(error).toBeNull();
      expect(data).toEqual(mockData);
      expect(supabase.storage.from).toHaveBeenCalledWith('tickets');
    });

    test('should create signed URL successfully', async () => {
      const mockSignedUrl = 'https://example.com/signed-url';
      const mockCreateSignedUrl = jest.fn().mockResolvedValue({ 
        data: { signedUrl: mockSignedUrl }, 
        error: null 
      });
      
      supabase.storage.from.mockReturnValue({
        createSignedUrl: mockCreateSignedUrl,
      });

      const { data, error } = await supabase.storage
        .from('tickets')
        .createSignedUrl('ticket.pdf', 60);

      expect(error).toBeNull();
      expect(data.signedUrl).toBe(mockSignedUrl);
      expect(mockCreateSignedUrl).toHaveBeenCalledWith('ticket.pdf', 60);
    });

    test('should handle signed URL creation error', async () => {
      const mockError = new Error('Failed to create signed URL');
      const mockCreateSignedUrl = jest.fn().mockResolvedValue({ 
        data: null, 
        error: mockError 
      });
      
      supabase.storage.from.mockReturnValue({
        createSignedUrl: mockCreateSignedUrl,
      });

      const { data, error } = await supabase.storage
        .from('tickets')
        .createSignedUrl('ticket.pdf', 60);

      expect(error).toBe(mockError);
      expect(data).toBeNull();
    });
  });
}); 