<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline (chapters and videos)" />
      <el-step title="Release new course" />
    </el-steps>

    <el-button
      type="text"
      @click="openChapterDialog()">Add chapter</el-button>

    <!-- Chapter -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button
              type="text"
              @click="openVideo(chapter.id)">Add video</el-button>
            <el-button
              type="text"
              @click="openEditChapter(chapter.id)">Modify</el-button>
            <el-button
              type="text"
              @click="removeChapter(chapter.id)">Delete</el-button>
          </span>
        </p>
        <!-- Video -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button
                  type="text"
                  @click="openEditVideo(video.id)">Modify</el-button>
                <el-button
                  type="text"
                  @click="removeVideo(video.id)">Delete</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button
        type="info"
        icon="el-icon-d-arrow-left"
        @click="previous">Previous</el-button>
      <el-button
        type="primary"
        @click="next">Save and next <i class="el-icon-d-arrow-right el-icon-right" /></el-button>
    </div>

    <!-- Add and modify chapter dialog -->
    <el-dialog
      :visible.sync="dialogChapterFormVisible"
      :before-close="closeChapter"
      title="Add chapter">
      <el-form
        :model="chapter"
        label-width="120px">
        <el-form-item label="Chapter title">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="Chapter sort">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          type="info"
          @click="cancelChapter">Cancel</el-button>
        <el-button
          type="primary"
          @click="saveOrUpdateCapter">Save</el-button>
      </div>
    </el-dialog>

    <!-- Add and modify video dialog -->
    <el-dialog
      :visible.sync="dialogVideoFormVisible"
      :before-close="closeVideo"
      title="Add or modify video">
      <el-form
        :model="video"
        label-width="120px">
        <el-form-item label="Video title">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="Video sort">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right" />
        </el-form-item>
        <el-form-item label="It is free?">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">Free</el-radio>
            <el-radio :label="0">Not free</el-radio>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Upload a video">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadVideoAliVod'"
            :limit="1"
            class="upload-demo">
            <el-button
              size="small"
              type="primary">Upload a video</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">Max support 1G per/video,<br>
                support 3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM etc... file to upload</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          type="info"
          @click="cancelVideo">Cancel</el-button>
        <el-button
          type="primary"
          @click="saveOrUpdateVideo">Save</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
  data() {
    return {
      courseId: '', // course id
      chapterVideoList: [], // All course chapters list include nested videos list by course id
      chapter: { // Chapter data
        title: '',
        sort: 0
      },
      video: {// Video
        id: '',
        title: '',
        sort: 0,
        isFree: 0,
        videoSourceId: '',
        videoOriginalName: ''
      },
      dialogChapterFormVisible: false, // Show dialog chapter
      dialogVideoFormVisible: false, // Show dialog video
      fileList: [], // file list for uplaod
      vodFlag: false, // If a video upload to VOD will be true.
      BASE_API: process.env.BASE_API // API address for upload
    }
  },
  created() {
    // Get course id from route address
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {
    // =================== Upload video to Ali Vod ===============

    // When you delete a video
    handleVodRemove() {
      video.deleteAliVodVideo(this.video.videoSourceId)
        .then(response => { // success to delete this upload video by videoSourceId in Ali Vod
          this.vodFlag = false
          this.$message({
            type: 'success',
            message: 'Delete completed'
          })
          this.fileList = []
          this.video.videoOriginalName = ''
          this.video.videoSourceId = ''
        })
    },
    // When you click × to remove a video
    beforeVodRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    // After success to upload a video
    handleVodUploadSuccess(response, file, fileList) {
      this.vodFlag = true
      this.video.videoSourceId = response.data.videoId
      this.video.videoOriginalName = file.name
    },
    // Notice info when upload more than one video
    handleUploadExceed() {
      this.$message.warning('Please remove this video if you want to add another video!')
    },
    // =================== Video ======================
    // Update video
    updateVideo() {
      video.updateVideo(this.video)
        .then(response => {
          // Close dialog
          this.video.id = ''
          this.fileList = []
          this.dialogVideoFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to modify this video!'
          })
          // Refresh
          this.getChapterVideo()
        })
    },
    // Modify video
    openEditVideo(videoId) {
      video.getVideo(videoId)
        .then(response => {
          this.video = response.data.video
          this.fileList = [{ 'name': this.video.videoOriginalName }]
          // TODO
          this.dialogVideoFormVisible = true
          // console.log('video.isFree ===>' + this.video.isFree)
          // console.log('video.chapterId ===>' + this.video.chapterId)
          // console.log('video.courseId ===>' + this.video.courseId)
          // console.log('video.videoSourceId ===>' + this.video.videoSourceId)
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        })
    },
    // Delete video
    removeVideo(videoId) {
      this.$confirm('This will permanently delete this video record. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // call delete video method
        video.deleteVideo(videoId)
          .then(response => { // success to delete video by id
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            // Refresh
            this.getChapterVideo()
          })
        // notice message
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },
    // Add video dialog
    openVideo(chapterId) {
      this.video.title = ''
      this.video.sort = 0
      this.video.isFree = 0
      this.video.videoSourceId = ''
      this.video.videoOriginalName = ''
      this.dialogVideoFormVisible = true
      // Get chapterId
      this.video.chapterId = chapterId
      this.video.courseId = this.courseId
    },
    // Add video
    addVideo() {
      video.addVideo(this.video)
        .then(response => {
          // Close dialog
          this.video.id = ''
          this.fileList = []
          this.dialogVideoFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to add this video!'
          })
          // Refresh
          this.getChapterVideo()
        })
    },
    // Save or update butten for video
    saveOrUpdateVideo() {
      if (!this.video.id) {
        this.addVideo()
      } else {
        this.updateVideo()
      }
    },
    // Cancel butten for video
    cancelVideo() {
      if (this.vodFlag) {
        this.handleVodRemove()
      }
      this.fileList = []
      this.video.videoSourceId = ''
      this.video.videoOriginalName = ''
      this.dialogVideoFormVisible = false
    },
    // Before add or update dialog close, set video id = ''
    closeVideo() {
      if (this.vodFlag) {
        this.handleVodRemove()
      }
      this.fileList = []
      this.video.videoSourceId = ''
      this.video.videoOriginalName = ''
      this.dialogVideoFormVisible = false
    },
    // =================== Chapter ======================
    // Delete chapter
    removeChapter(chapterId) {
      this.$confirm('This will permanently delete this chapter record. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // delete chapter method
        chapter.deleteChapter(chapterId)
          .then(response => { // success to delete chapter by id
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            // Refresh
            this.getChapterVideo()
          })
        // notice message
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },
    // Modify chapter
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapter.getChapter(chapterId)
        .then(response => {
          this.chapter = response.data.chapter
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        })
    },
    // Open chapter dialog
    openChapterDialog() {
      this.dialogChapterFormVisible = true
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    // Add chapter
    addChapter() {
      // Set course id into chapter
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter)
        .then(response => {
          // Close dialog
          this.dialogChapterFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to add this chapter!'
          })
          // Refresh
          this.getChapterVideo()
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        })
    },
    // Modify chapter
    updateChapter() {
      chapter.updateChapter(this.chapter)
        .then(response => {
          // Close dialog
          this.chapter.id = ''
          this.dialogChapterFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to modify this chapter!'
          })
          // Refresh
          this.getChapterVideo()
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        })
    },
    // Save or update butten for chapter
    saveOrUpdateCapter() {
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },
    // Cancel butten for add or modify chapter
    cancelChapter() {
      this.chapter.id = ''
      this.dialogChapterFormVisible = false
    },
    // Before add or update dialog colse, set chapter id = ''
    closeChapter() {
      this.chapter.id = ''
      this.dialogChapterFormVisible = false
    },
    // Get all course chapters list include all videos list by course id
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId)
        .then(response => {
          this.chapterVideoList = response.data.allChapterVideo
        })
    },
    previous() {
      // Go to previous step
      this.$router.push({ path: '/edu/course/courseinfo/' + this.courseId })
    },
    next() {
      // Go to next step
      this.$router.push({ path: '/edu/course/publish/' + this.courseId })
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  /*float: left;*/
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
